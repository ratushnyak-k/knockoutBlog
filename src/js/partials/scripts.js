function ViewModel () {
    var self = this;
    self.title = ko.observable('');
    self.text = ko.observable('');
    self.readVisiblity = ko.observable(false);
    self.visibleRate = ko.observable(true);
    self.rating = ko.observableArray([0,1,2,3,4,5]);
    self.img = ko.observable('');
    self.posts = ko.observableArray(
        [
            new PostsList("First", 'Lorem.', '', (new Date().getTime() + 100000), 0, 0, 4),
            new PostsList("Second", 'Lorem', 'img/success.png', (new Date().getTime() + 50000), 24, 0, 7),
            new PostsList("Third", 'Loresgdfg', 'img/success.png', new Date().getTime(), 144, 0, 35),
            new PostsList("Fourth", 'Loredsfg.', 'img/success.png', new Date().getTime(), 154, 0, 134),
            new PostsList("Fifth", 'Lorgfdde.', 'img/success.png', new Date().getTime(), 14, 0, 4)
        ]
    );

    self.onChangeRate = function (a,b,c) {

        this.ratingSetted(true);
        this.totalRate(parseFloat(((this.commonRate + this.rate()) / (this.countPeopleRate + 1)).toFixed(2)));
    };

    self.postByRate = ko.computed(function () {
        var sortPosts = self.posts().slice();

        sortPosts.sort(function(x, y){
            return y.totalRate() - x.totalRate();
        });

        return sortPosts.splice(0, 5)
    }, this);

    self.addPost = function () {
        self.posts.unshift(new PostsList(self.title(), self.text(), self.img(), new Date().getTime(), 0, 0, 0));
        self.readVisiblity(true);
    };
};

function PostsList (title, text, img, timestamp, totalRate, rate, countPeopleRate) {
    var self = this
    self.post_header = title;
    self.post_main = text;
    self.articleImg = img;
    self.timestamp = timestamp;
    self.time = new Date(timestamp).toString();
    self.countPeopleRate = countPeopleRate;
    self.conditionCountPeopleRate = countPeopleRate || 1;
    self.commonRate = totalRate;
    var proccessingRate = parseFloat((totalRate / self.conditionCountPeopleRate).toFixed(2));
    self.totalRate = ko.observable(proccessingRate);
    self.rate = ko.observable(rate);
    self.ratingSetted = ko.observable(false);
}
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

var myViewModel = new ViewModel();
ko.applyBindings(myViewModel, document.getElementById('viewModel'));

function Personal () {
    var self = this;
    self.firstName = ko.observable('');
    self.lastName = ko.observable('');
    self.age = ko.observable('');
    self.fullName = ko.computed(function () {
        return self.firstName() + ' ' + self.lastName()
    });
    self.gender = ko.observable('');
    self.profileVisibility = ko.observable(false);
    self.saveProfile = function () {
        self.profileVisibility(true)
    };
    self.editProfile = function () {
        self.profileVisibility(false)
    };
}

var personalInfo = new Personal();
ko.applyBindings(personalInfo, document.getElementById('profile'))
