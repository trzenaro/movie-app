/* eslint-disable */
const bcryptjs = require('bcryptjs');
const { UserModel, CategoryModel, ItemModel } = require('./domain/models');

const populate = async () => {
  const userCount = await UserModel.find().countDocuments();
  if (userCount > 0) return;

  console.log('Populating data for bootstraping application...');
  await Promise.all([
    new UserModel({ name: 'Admin', email: 'admin@movieapp.com', password: bcryptjs.hashSync('admin', 10) }).save(),
    new UserModel({ name: 'Thiago', email: 'thiago@movieapp.com', password: bcryptjs.hashSync('thiago', 10) }).save(),
    new UserModel({ name: 'Maria', email: 'maria@movieapp.com', password: bcryptjs.hashSync('maria', 10) }).save(),
  ]);

  const [movieCategory, serieCategory, documentaryCategory] = await Promise.all([
    new CategoryModel({ name: 'Filme' }).save(),
    new CategoryModel({ name: 'Série' }).save(),
    new CategoryModel({ name: 'Documentário' }).save(),
  ]);

  await Promise.all([
    new ItemModel({ name: 'Matrix', category: movieCategory, imageUrl: 'https://files.incrivel.club/files/news/part_7/74055/463205-matrix-1999-11-g-650-b347e28145-1484649090.jpg' }).save(),
    new ItemModel({ name: 'O Resgate do Soldado Ryan', category: movieCategory, imageUrl: 'https://files.incrivel.club/files/news/part_7/74055/463355-9-650-b89b9ef9df-1484649090.jpg' }).save(),
    new ItemModel({ name: 'Vingadores - Ultimato', category: movieCategory, imageUrl: 'https://segredosdomundo.r7.com/wp-content/uploads/2019/10/melhores-filmes-de-2019-confira-a-lista-dos-selecionados-12.jpg' }).save(),
    new ItemModel({ name: 'Homem Aranha - Longe de Casa', category: movieCategory, imageUrl: 'https://segredosdomundo.r7.com/wp-content/uploads/2019/10/melhores-filmes-de-2019-confira-a-lista-dos-selecionados-22.jpg' }).save(),
    new ItemModel({ name: 'Vidro', category: movieCategory, imageUrl: 'https://segredosdomundo.r7.com/wp-content/uploads/2019/10/melhores-filmes-de-2019-confira-a-lista-dos-selecionados-9.jpg' }).save(),

    new ItemModel({ name: 'Friends', category: serieCategory, imageUrl: 'https://www.revistabula.com/wp/wp-content/uploads/2017/05/Friends.jpg' }).save(),
    new ItemModel({ name: 'Breaking Bad', category: serieCategory, imageUrl: 'https://www.revistabula.com/wp/wp-content/uploads/2017/05/Breaking-Bad-2.jpg' }).save(),
    new ItemModel({ name: 'Game of Thrones', category: serieCategory, imageUrl: 'https://www.revistabula.com/wp/wp-content/uploads/2017/05/Game-of-Thrones-2.jpg' }).save(),
    new ItemModel({ name: 'Os Simpsons', category: serieCategory, imageUrl: 'https://www.revistabula.com/wp/wp-content/uploads/2017/05/Os-Simpsons.jpg' }).save(),
    new ItemModel({ name: 'Grey’s Anatomy', category: serieCategory, imageUrl: 'https://www.revistabula.com/wp/wp-content/uploads/2017/05/Greys-Anatomy.jpg' }).save(),

    new ItemModel({ name: 'Nosso Planeta', category: documentaryCategory, imageUrl: 'https://cdn.fstatic.com/media/movies/covers/2019/06/uyuyi.jpg' }).save(),
    new ItemModel({ name: 'Icarus', category: documentaryCategory, imageUrl: 'https://blogdescalada.com/wp-content/uploads/2017/08/icarus-netflix-cartaz.jpg' }).save(),
    new ItemModel({ name: 'Virunga', category: documentaryCategory, imageUrl: 'http://br.web.img2.acsta.net/c_215_290/pictures/14/09/11/14/14/408454.jpg' }).save(),
    new ItemModel({ name: 'Making a Murderer', category: documentaryCategory, imageUrl: 'http://br.web.img3.acsta.net/c_216_288/pictures/15/12/18/17/53/165051.png' }).save(),
    new ItemModel({ name: 'Investigação Criminal', category: documentaryCategory, imageUrl: 'https://media.fstatic.com/m8oZOmIwLnRiS8j7pbjxZPeIt5M=/fit-in/290x478/smart/media/movies/covers/2018/05/Captura_de_Tela_2018-05-12_as_23.40.50.png' }).save(),
  ]);

  console.log('Populate complete!');
};

module.exports = populate;
