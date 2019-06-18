var expect = require('expect');

var {generateMessage, generateLocationMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate the correct json object', () => {
  	 var from = 'Jen';
  	 var text = 'Some message';

  	 var message = generateMessage(from, text);

  	 expect(typeof message.createdAt).toBe('number');
  	 expect(message).toMatchObject({
  	 	from, text
  	 })
  })
})

describe('generateLocationMessage', () => {
	it('should generate the correct location object', () => {
		var from = 'admin';
		var lat = 1;
		var lon = 1;
		var url = `https://www.google.com/maps?q=1,1`;

		var message = generateLocationMessage(from, lat, lon);

		 expect(typeof message.createdAt).toBe('number');
  	     expect(message).toMatchObject({
  	 	    from, url
  	     })
	})
})