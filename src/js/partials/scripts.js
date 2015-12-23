function ViewModel () {
    var self = this;
    self.title = ko.observable('');
    self.text = ko.observable('');
    self.readVisiblity = ko.observable(false);
    self.rating = ko.observableArray([0,1,2,3,4,5]);
    self.img = ko.observable('');
    self.posts = ko.observableArray(
        [
            new PostsList("First", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Maiores modi sunt blanditiis quasi saepe aut, facere fugiat assumenda repudiandae voluptatem, nulla amet, non omnis iure fugit laborum inventore. Adipisci, mollitia.', '', (new Date().getTime() + 100000), 0, 0),
            new PostsList("Second", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Dolores ipsam quia eos tempore, officia facere maxime nobis voluptatem quaerat, magnam, reiciendis at molestiae doloremque hic voluptatibus corporis accusantium quod repellat.', 'img/success.png', (new Date().getTime() + 50000), 4, 0),
            new PostsList("Third", 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Incidunt veritatis ipsum atque quis, repellendus aliquam error. Minima nobis culpa iste, libero, laboriosam quam a accusantium, nostrum consequuntur accusamus, incidunt praesentium.', 'img/success.png', new Date().getTime(), 1, 0),
        ]);
    self.postByRate = ko.computed(function () {
        var sortPosts = self.posts().slice();

        sortPosts.sort(function(x, y){
            return y.totalRate - x.totalRate;
        });

        return sortPosts
    }, this)
    self.newRating = function () {
        // TODO: make count of people who rated
        console.log(self.numberOfPost())
        // self.posts()[self.numberOfPost].totalRate = ((this.totalRate + this.rate) / 2);
    }
    self.addPost = function () {
        self.posts.unshift(new PostsList(self.title(), self.text(), new Date().getTime(), 0, 0));
        self.readVisiblity(true);
    }
    self.showImg = function () {
        // self.fileUpload()
        // console.log(this)




    }

}

function PostsList (title, text, img, timestamp, totalRate, rate) {
    var self = this
    self.post_header = title;
    self.post_main = text;
    self.articleImg = img;
    self.timestamp = timestamp;
    self.time = new Date(timestamp).toString();
    self.totalRate = totalRate;
    self.rate = rate;
}
var myViewModel = new ViewModel();
function readURL(input) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            myViewModel.img(e.target.result);
        }

        reader.readAsDataURL(input.files[0]);
    }
}
$("[type='file']").change(function(){
    readURL(this);
});
ko.applyBindings(myViewModel);
