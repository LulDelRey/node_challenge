// ecnrypt the password and save the hash, next step
exports.seed = function (knex) {
  return knex('articles')
    .del()
    .then(() => knex('authors').del())
    .then(() =>
      knex('authors').insert([
        {
          name: 'Luis',
          email: 'luis@gmail.com',
          password: 'luis123',
          picture: 'alguma',
          role: 'ADM',
        },
        {
          name: 'Eduardo',
          email: 'eduedu@gmail.com',
          password: 'edu123',
          picture: 'algumatbm',
          role: 'AUT',
        },
        {
          name: 'Mari',
          email: 'mari@gmail.com',
          password: 'mari123',
          picture: 'outra',
          role: 'aut',
        },
      ])
    )
    .then(() =>
      knex('articles').insert([
        {
          author_id: '1',
          category: 'Performance',
          title: 'Some performance tips',
          summary: 'This article gives some tips for better performance',
          first_paragraph:
            "The first tip is some tip that i definitly don't know",
          body: "Now we have some more tips that i really don't know",
        },
        {
          author_id: '2',
          category: 'News',
          title: 'Some kitten was saved',
          summary:
            'The kitten of a local resident was stuck in a tree and was saved',
          first_paragraph: 'The kitten is in great danger :o',
          body: 'The firefighters arrived and will save the kitten',
        },
        {
          author_id: '3',
          category: 'News',
          title: 'Some puppy was saved',
          summary: 'The puppy of a local resident was lost and were found',
          first_paragraph:
            'My puppy is missing, says thamara, a local resident',
          body:
            "My puppy was missing but ir were playing on my neighbor's garden",
        },
      ])
    );
};
