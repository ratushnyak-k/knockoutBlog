function ViewModel () {
    var self = this;
    self.title = ko.observable('');
    self.text = ko.observable('');
    self.readVisiblity = ko.observable(false)
    self.rate = ko.observableArray([0,1,2,3,4,5]);
    self.posts = ko.observableArray(
        [
            new PostsList("First", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores modi sunt blanditiis quasi saepe aut, facere fugiat assumenda repudiandae voluptatem, nulla amet, non omnis iure fugit laborum inventore. Adipisci, mollitia.', (new Date().getTime() + 100000), 0),
            new PostsList("Second", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores ipsam quia eos tempore, officia facere maxime nobis voluptatem quaerat, magnam, reiciendis at molestiae doloremque hic voluptatibus corporis accusantium quod repellat.', (new Date().getTime() + 50000), 4),
            new PostsList("Third", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt veritatis ipsum atque quis, repellendus aliquam error. Minima nobis culpa iste, libero, laboriosam quam a accusantium, nostrum consequuntur accusamus, incidunt praesentium.', new Date().getTime(), 1),
        ]);
    self.postByRate = ko.computed(function () {
        var sortPosts = self.posts().slice();
        sortPosts.sort(function(x, y){
            return y.rate - x.rate;
        });
        return sortPosts
    }, this)
    self.addRate = function (i) {
        console.log(i)
        // self.post
    }
    self.addPost = function () {
        self.posts.unshift(new PostsList(self.title(), self.text(), new Date().getTime(), 0));
        console.log(myViewModel.posts());
        self.readVisiblity(true);
    }
    self.editPost = function () {
        self.posts.remove(this)
        self.readVisiblity(false);
    }
    self.fileUpload = ko.observable('');
    self.showImg = function (e) {
        self.fileUpload()

    }

}

var myViewModel = new ViewModel();

function PostsList (title, text, timestamp, rate) {
    var self = this
    self.post_header = title;
    self.post_main = text;
    self.timestamp = new Date(timestamp);
    self.time = self.timestamp.toString();
    self.rate = rate;
}

ko.applyBindings(myViewModel);
