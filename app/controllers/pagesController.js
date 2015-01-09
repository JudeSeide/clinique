var locomotive = require('locomotive')
    , Controller = locomotive.Controller;

require('professionnelsController');

var pagesController = new Controller();

pagesController.main = function() {
    this.title = 'TP3';

    var toto = {nom:'lala'};
    this.render(toto);
}



module.exports = pagesController;
