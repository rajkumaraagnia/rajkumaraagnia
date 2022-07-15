const translate = new Translate({
    projectId: process.env.GOOGLE_CLOUD_PROJECT_ID,
  });
 
  // Translates some text into Indonesian  
  const text = 'Hello, world!';
  const target = 'id';
 
  translate
    .translate(text, target)
    .then(results => {
      console.log(results[0]);
    })
    .catch(err => {
      console.error('ERROR:', err);
    });

    module.exports=translate