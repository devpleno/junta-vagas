const axios = require('axios');
const cheerio = require('cheerio');

const extractJobs = (html) => {
  const jobs = [];
  const $ = cheerio.load(html);

  const platform = 'github-frontend-br';

  $('.js-navigation-item > *')
    .toArray()
    .forEach((item) => {
      const title = $(item).find('a.Link--primary').text();

      const workMode = title.split('] ')[0].replace('[', '');

      const link = `https://github.com${$(item)
        .find('a.Link--primary')
        .attr('href')}`;

      let titleActual = title;

      titleActual = title.split('@')[0];
      let company = title.split('@')[1];

      if (!company) {
        titleActual = title.split(' na ')[0];
        company = title.split(' na ')[1];
      }

      if (!company) {
        titleActual = title.split(' no ')[0];
        company = title.split(' no ')[1];
      }

      if (!company) {
        titleActual = title.split(' at ')[0];
        company = title.split(' at ')[1];
      }

      if (company && company[0] === ' ') {
        company = company.slice(1, company.length);
      }

      if (company && company.split(' ').length > 1) {
        let firstname = company.split(' ')[0];
        let secondname = company.split(' ')[1];

        if (secondname[0] === '(') {
          company = `${firstname}`;
        } else {
          company = `${
            firstname.length > 2 ? firstname + ' ' : ''
          }${secondname}`;
        }
      }

      if (company && company.split(',').length > 0) {
        company = company.split(',')[0];
      }

      if (!company) {
        company = undefined;
      }

      const postedAt = $(item).find('relative-time').attr('datetime');

      if (title) {
        jobs.push({
          title: titleActual,
          company,
          locale: workMode,
          link,
          platform,
          postedAt,
        });
      }
    });

  return jobs;
};

const getData = async () => {
  const response = await axios.get(
    'https://github.com/frontendbr/vagas/issues'
  );
  const html = response.data;
  // console.log(html);
  console.log(extractJobs(html));
};

getData();
