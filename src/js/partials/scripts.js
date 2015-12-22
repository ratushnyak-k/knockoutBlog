function ViewModel () {
    var self = this;
    self.posts = ko.observableArray([
            {
                post_header: 'Article',
                post_main: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis expedita fuga, nam voluptate, minus culpa consequatur vitae repellendus autem facilis, ducimus temporibus officia quo nulla cumque neque natus iste voluptatibus.',
                timestamp: '15.05.2016'
            },
            {
                post_header: 'Article',
                post_main: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis expedita fuga, nam voluptate, minus culpa consequatur vitae repellendus autem facilis, ducimus temporibus officia quo nulla cumque neque natus iste voluptatibus.',
                timestamp: '15.05.2016'
            },
            {
                post_header: 'Article',
                post_main: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis expedita fuga, nam voluptate, minus culpa consequatur vitae repellendus autem facilis, ducimus temporibus officia quo nulla cumque neque natus iste voluptatibus.',
                timestamp: '15.05.2016'
            },
            {
                post_header: 'Article',
                post_main: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Corporis expedita fuga, nam voluptate, minus culpa consequatur vitae repellendus autem facilis, ducimus temporibus officia quo nulla cumque neque natus iste voluptatibus.',
                timestamp: '15.05.2016'
            }
        ]);
}

var myViewModel = new ViewModel();
ko.applyBindings(myViewModel);
