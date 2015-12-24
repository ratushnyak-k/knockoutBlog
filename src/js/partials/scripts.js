function ViewModel () {
    var self = this;
    self.title = ko.observable('');
    self.text = ko.observable('');
    self.readVisiblity = ko.observable(false);
    self.rating = ko.observableArray([0,1,2,3,4,5]);
    self.visibleRate = ko.observable(false);
    self.img = ko.observable('');
    self.posts = ko.observableArray(
        [
            new PostsList("First", 'Lorem.', '', (new Date().getTime() + 100000), 0, 0),
            new PostsList("Second", 'Lorem', 'img/success.png', (new Date().getTime() + 50000), 4, 0),
            new PostsList("Third", 'Lore.', 'img/success.png', new Date().getTime(), 1, 0),
        ]);
    self.onChangeRate = function () {
        self.posts.subscribe(function () {

        })
    }
    self.postByRate = ko.computed(function () {
        var sortPosts = self.posts().slice();

        sortPosts.sort(function(x, y){
            return y.totalRate - x.totalRate;
        });

        return sortPosts
    }, this);
    self.newRating = function () {
        self.visibleRate(true)
        // TODO: make count of people who rated
        // console.log(self.numberOfPost())
        // self.posts()[self.numberOfPost].totalRate = ((this.totalRate + this.rate) / 2);
    };
    self.addPost = function () {
        self.posts.unshift(new PostsList(self.title(), self.text(), new Date().getTime(), 0, 0));
        self.readVisiblity(true);
    };
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
    self.radioSelectedOptionValue = ko.observable(true);
    self.A = ko.computed( {
            read: function() {
                return self.radioSelectedOptionValue() == "true";
            },
            write: function(value) {
                if (value)
                    self.radioSelectedOptionValue("true");
            }
        }, this);
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
