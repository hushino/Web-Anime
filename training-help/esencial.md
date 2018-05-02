Ejecutar: set NODE_ENV=production node public/dist/bundle.js
node --stack-size=16000 start.js

https://yahooeng.tumblr.com/post/68823943185/nodejs-high-availability
https://machinelearningmastery.com/develop-a-caption-generation-model-in-keras/
https://arxiv.org/list/cs/recent
https://philipwalton.github.io/solved-by-flexbox/
http://soyfrontend.com/guia-visual-aprender-flexbox-css3/
http://www.falconmasters.com/web-design/sitio-web-layout-flexbox/
http://www.embeddedjs.com/getting_started.html
https://stackoverflow.com/questions/22876978/loop-inside-react-jsx?rq=1
http://mongoosejs.com/docs/queries.html
http://thecodebarbarian.com/mongoose-custom-query-methods

https://github.com/perminder-klair/nodejs-pagination-demo/blob/master/index.js
https://github.com/siuying/hk-node-js/blob/master/views/pagination.ejs
https://pastebin.com/utSkjmBf
https://evdokimovm.github.io/javascript/nodejs/mongodb/pagination/expressjs/ejs/bootstrap/2017/08/20/create-pagination-with-nodejs-mongodb-express-and-ejs-step-by-step-from-scratch.html
https://github.com/CodeSeven/toastr
https://www.youtube.com/channel/UCfYTu_qAO5T7a-8rC_74Ypw/videos?disable_polymer=1
https://github.com/expressjs/express/issues/2758
http://jlongster.com/Backend-Apps-with-Webpack--Part-II
https://github.com/jantimon/html-webpack-plugin/issues/664
https://css-tricks.com/examples/ShapesOfCSS/
https://survivejs.com/webpack/building/source-maps/

https://github.com/webpack/webpack/issues/1206
https://alejandronapoles.com/2016/09/29/simple-production-environment-with-webpack-and-express/
https://stackoverflow.com/questions/41707662/webpack-express-ejs-error-cannot-find-module


https://github.com/IBM/type


update: with webpack3 the syntax for loaders has changed. 'ejs-render!./dev/index.ejs' should now be: 'ejs-render-loader!./dev/index.ejs'

ES2017
Object.entries(obj).forEach(
    ([key, value]) => console.log(key, value)
);
Tanto Object.keys () como Object.entries () iteran las propiedades en el mismo orden que un bucle for ... in
pero ignoran la cadena del prototipo. Solo se iteran las propiedades enumerables del objeto.

o = { bar: 42 };
d = Object.getOwnPropertyDescriptor(serie.episodes, 'values.slug');
console.log(d)

<% if (locals.user) { %>

  //Your logic goes here

<% } %>

<% if (typeof user == 'object' && user) { %>

<% } %>

<%= user.name ? user.name : '' %>
<%= typeof user.name!='undefined' ? user.name : '' %>

<% if (typeof user == 'object' && user) { %>
...
<% } %>

You need to check user is undefined or not. So the code should be:

<% if (user && user.verified == true) { %>
  <h1> Success </h1>
<% } else { %>
  <h1> Failure </h1>
<% } %>


<% switch (role) {
case 'Admin' : %>
        Super Admin
        <% break;

case 'eventAdmin' : %>
        Event Admin
        <% break;

case 'subAdmin' : %>
        Sub Admin
        <% break;

} %>

<ul class="breadcrumb">
      <% _.each(slots.crumbs, function(crumb, i, crumbs) { %>
        <% var last = ((i + 1) === crumbs.length) %>
        <% var crumb = slots.crumbs[i] %>
        <li class="<%= last ? 'active' : '' %>">
          <a href="<%= crumb.href %>"><%= crumb.title %></a>
            <%- last ? '' : '<span class="divider">&raquo;</span>'%>
        </li>
      <% }) %>
    </ul>


brew update
brew install yarn
brew upgrade yarn
yarn init
yarn add webpack webpack-dev-server path
touch webpack.config.js
yarn add babel-loader babel-core babel-preset-es2015 babel-preset-react --dev
yarn add html-webpack-plugin
yarn start



<form role="form" method="post">
  <div class="form-group">
    <label for="education">Education:</label>
    <% for(var i = 0; i < user.resume.education.length; i++) { %>
    <input type="text" class="form-control" name="education" id="education" value="<%= user.resume.education[i] %>">
    <% } %>
  </div>
  <button type="submit" class="btn btn-primary">Submit</button>
</form>



https://images.guide/

https://github.com/mbeaudru/modern-js-cheatsheet

https://github.com/MoonHighway/learning-react/tree/master/chapter-04

https://learnnextjs.com/basics/getting-started

https://opennews.org/
---------
http://mongoosejs.com/docs/api.html#query_Query-populate
Kitten.findOne().populate('owner').exec(function (err, kitten) {
  console.log(kitten.owner.name) // Max
})

Kitten.find().populate({
    path: 'owner'
  , select: 'name'
  , match: { color: 'black' }
  , options: { sort: { name: -1 }}
}).exec(function (err, kittens) {
  console.log(kittens[0].owner.name) // Zoopa
})

// alternatively
Kitten.find().populate('owner', 'name', null, {sort: { name: -1 }}).exec(function (err, kittens) {
  console.log(kittens[0].owner.name) // Zoopa
})
----------
