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
    self.email = ko.observable('');
    self.fullName = ko.computed(function () {
        return self.firstName() + ' ' + self.lastName()
    });
    self.gender = ko.observable('');
    self.profileVisibility = ko.observable(false);
    self.validated = ko.observable(false)
    self.saveProfile = function () {
        self.isValidate(true);
        if (self.validated()) {
            self.profileVisibility(true)
        };
    };
    self.editProfile = function () {
        self.profileVisibility(false)
    };
    self.isValidate = ko.observable(false);
}
var firstNameField, lastNameField, email, ageField, genderField;
ko.bindingHandlers.validation = {
    update: function (element, valueAccessor, allBindings, bindingContext) {
        var valueUnwrapped = ko.unwrap(valueAccessor());
        function errorValidate (element, text) {
            $(element).next('.error').html(text);
        }
        var firstNameRegEx = /^[a-zA-Z ]+$/;
        var emailRegEx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (valueUnwrapped) {
            if (allBindings.has('firstName')) {
                if(!bindingContext.firstName()) {
                    errorValidate(element, 'This field is required');
                } else {
                    errorValidate(element, '');
                    if(firstNameRegEx.test(bindingContext.firstName())) {
                        errorValidate(element, '');
                        firstNameField = true;

                    } else {
                        errorValidate(element, 'This is not a name')
                    }
                }
            }
            if (allBindings.has('lastName')) {
                if(!bindingContext.lastName()) {
                    errorValidate(element, 'This field is required');
                } else {
                    errorValidate(element, '');
                    if(firstNameRegEx.test(bindingContext.lastName())) {
                        errorValidate(element, '');
                        lastNameField = true;
                    } else {
                        errorValidate(element, 'This is not a name')
                    }
                }
            }
            if (allBindings.has('email')) {
                if(!bindingContext.email()) {
                    errorValidate(element, 'This field is required');
                } else {
                    errorValidate(element, '');
                    if(emailRegEx.test(bindingContext.email())) {
                        errorValidate(element, '');
                        email = true;
                    } else {
                        errorValidate(element, 'This is not an email')
                    }
                }
            }
            if (allBindings.has('age')) {
                if(!bindingContext.age()) {
                    errorValidate(element, 'Please, select your age');
                } else {
                    errorValidate(element, '');
                    ageField = true;
                }
            }
            if (allBindings.has('gender')) {
                if(!bindingContext.gender()) {
                    errorValidate(element, 'Please, select your gender');
                } else {
                    errorValidate(element, '');
                    genderField = true;
                }
            }
            if (firstNameField && lastNameField && email && ageField && genderField) {
                personalInfo.validated(true)
            };
        };
    }
};
var personalInfo = new Personal();
ko.applyBindings(personalInfo, document.getElementById('profile'))
