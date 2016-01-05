var myInfo = new Personal('Kostya', 'Ra', 22, '', 'email@email.com', 'male');
var Ivan = new Personal('Ivan', 'Kon', 27, 'img/Ivan.jpg','email@email.com', 'male', 1);
var Dmitry = new Personal('Dmitry', 'Kol', 29, 'img/Dmitry.jpg','email@email.com', 'male', 1);
var Ruslan = new Personal('Ruslan', 'Chu', 29, 'img/Ruslan.jpg','email@email.com', 'male', 1);
var Artem = new Personal('Artem', 'Anc', 22, 'img/Artem.jpg','email@email.com', 'male', 1);
var Alex = new Personal('Alex', 'Kud', 30, 'img/Alex.jpg','email@email.com', 'male', 1);

var thisHash = window.location.hash;
if (thisHash) {
    thisHash = parseFloat(thisHash.slice(1));
}
function Comment (author, authorAva, text, time) {
    var self = this;
    self.commentAuthor = author;
    self.ava = authorAva;
    self.commentText = ko.observable(text);
    self.commentTime = time;
    self.editCommentVisibility = ko.observable(false);
}
function Personal (firstName, lastName, age, Ava, email, gender, CountOfArticles) {
    var self = this;
    self.firstName = ko.observable(firstName);
    self.lastName = ko.observable(lastName);
    var ava = Ava || 'img/no_ava.png';
    self.ava = ko.observable(ava);
    self.age = ko.observable(age);
    self.email = ko.observable(email);
    self.fullName = ko.computed(function () {
        return self.firstName() + ' ' + self.lastName();
    });
    self.gender = ko.observable(gender);
    self.profileVisibility = ko.observable(false);
    self.validated = ko.observable(false);
    self.saveProfile = function () {
        self.isValidate(true);
        if (self.validated()) {
            self.profileVisibility(true);
        }
    };
    self.editProfile = function () {
        self.profileVisibility(false);
    };
    self.isValidate = ko.observable(false);
    var countOfArticles = CountOfArticles || 0;
    self.countOfArticles = ko.observable(countOfArticles);
}

function ViewModel () {
    var self = this;
    self.title = ko.observable('');
    self.text = ko.observable('');
    self.readVisiblity = ko.observable(false);
    self.visibleRate = ko.observable(true);
    self.rating = ko.observableArray(['',1,2,3,4,5]);
    self.img = ko.observable('');
    self.posts = ko.observableArray(
        [
            new PostsList(
                'First',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Iure laborum autem sed quod, nisi, pariatur nostrum reiciendis voluptatum dicta labore minima sint ipsam officia. Minus cumque eligendi aperiam temporibus omni lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quam id commodi expedita consequatur, saepe fugit numquam culpa vero nemo accusamus fugiat, ipsam officia dolorum modi cum aliquam ducimus, tempora quasi Lorem ipsum dolor sit amet, consectetur adipisicing elit. Facere nostrum perferendis sequi impedit voluptatem officia, dolorem accusamus culpa, deserunt sunt pariatur soluta aliquam beatae inventore ut est sapiente ullam quibusdam nihil corporis? Magnam nostrum nesciunt voluptatem quibusdam facere. Aut sed veritatis necessitatibus possimus maiores nostrum libero fugiat ad enim repudiandae inventore reprehenderit, repellat iure, fuga minus deleniti debitis, recusandae quo ipsam. Recusandae debitis sequi, assumenda obcaecati odit doloribus ipsum, nihil nulla, blanditiis, atque voluptates natus. Ullam placeat fugiat laudantium eaque doloremque a soluta at, corporis ducimus ex nemo explicabo. Ducimus atque aut reiciendis dolore, iusto impedit eum voluptates sequi consectetur labore, odit error numquam illo ea itaque earum molestias quae. Itaque perspiciatis illo, nihil inventore est deleniti minus, quas sint molestiae facilis voluptas numquam possimus quis repudiandae saepe! Facilis repellat odit ea incidunt ducimus, totam consectetur labore veniam dolorem suscipit deserunt rem eos neque iusto unde expedita accusantium, cum repellendus blanditiis, impedit accusamus eius odio! Incidunt itaque, optio quidem eaque quam libero, odit quos iusto rerum at fugit numquam eius. Quas earum ducimus vel maxime esse veniam doloribus nihil, sunt autem expedita incidunt ipsa minus architecto consequuntur, fugit perferendis? Ea neque culpa ab obcaecati harum dolor eius, excepturi incidunt voluptatum.',
                'img/1p.jpg',
                Ivan.fullName(),
                Ivan.ava(),
                (new Date().getTime() + 100000), 0, 0, 4,
                [
                    new Comment(myInfo.fullName(), myInfo.ava(), 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, officiis?', new Date()),
                    new Comment(Ivan.fullName(), Ivan.ava(), 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, officiis?', new Date()),
                    new Comment(Dmitry.fullName(), Dmitry.ava(), 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, officiis?', new Date()),
                    new Comment(Ruslan.fullName(), Ruslan.ava(), 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, officiis?', new Date()),
                    new Comment(Artem.fullName(), Artem.ava(), 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, officiis?', new Date()),
                    new Comment(Alex.fullName(), Alex.ava(), 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Distinctio, officiis?', new Date()),
                ]),
            new PostsList(
                'Second',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Provident fugit alias quidem ea facere, deleniti quam ipsam vel suscipit optio aliquam minima aspernatur repellendus distinctio accusamus dolores tempore accusantium. Impedi lorem  Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laborum nisi, facilis, suscipit ipsum quaerat adipisci inventore eveniet provident nesciunt dolorem, blanditiis voluptatem asperiores? Velit sequi, doloribus, et aut quod ducimus Lorem ipsum dolor sit amet, consectetur adipisicing elit. Eaque repudiandae eveniet in ipsum sequi quia minus nesciunt aliquid, non, laudantium nam eum quo necessitatibus reprehenderit obcaecati sapiente rem sunt excepturi, ex dolore quibusdam nemo earum odit et. Placeat delectus itaque natus voluptas, omnis ad nostrum, rem perferendis eos laborum cum, incidunt autem voluptatem commodi dignissimos. Totam odio, quidem quasi ratione est eum nesciunt at ullam similique reprehenderit! Pariatur distinctio repudiandae quidem minima dolore possimus commodi, veniam quos cupiditate ducimus rerum qui fugiat labore perspiciatis nemo itaque aliquam ea enim, amet consequatur eos obcaecati. Et recusandae, ipsam unde debitis ipsa perferendis odit provident accusantium necessitatibus, similique ducimus doloribus maxime, incidunt laudantium modi! Cum quos inventore alias ut quam tenetur magni pariatur. Soluta beatae quod voluptate animi ipsa impedit! Dolorem vel error, possimus nihil quia, obcaecati, itaque illo sit, beatae quaerat perspiciatis quis nesciunt velit distinctio repudiandae sequi nisi. Recusandae facere asperiores fuga sapiente tempora voluptates perspiciatis eius praesentium porro, unde maxime veniam minima cupiditate enim nisi explicabo beatae deserunt eum laboriosam saepe illo vel repellendus assumenda corporis. Animi nemo impedit maiores quisquam velit neque excepturi corporis quae enim earum quo laborum molestias, harum suscipit debitis dolore necessitatibus quasi. Facilis quis, quas.',
                'img/2p.jpg',
                Dmitry.fullName(),
                Dmitry.ava(),
                (new Date().getTime() + 50000), 24, 0, 7, []),
            new PostsList(
                'Third',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Deserunt, similique. Beatae, nam, quia! Nobis quo, iste repudiandae atque labore at sunt! Dolore iste, alias laboriosam nihil, nesciunt quam assumenda ame lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Doloribus eum consequuntur ut, impedit sequi harum necessitatibus, quos culpa vero! Harum magnam ex quam eum nihil quis iste rerum laboriosam recusandae Lorem ipsum dolor sit amet, consectetur adipisicing elit. Illo omnis, quidem ad quia at ullam iure ratione quod ducimus reiciendis fugiat laboriosam doloremque, expedita amet rem esse architecto deleniti asperiores repudiandae cumque officia voluptatibus non. Quasi maxime, earum quos repudiandae pariatur cupiditate sapiente id consectetur mollitia fuga provident illum esse nemo voluptates similique labore alias, quas officiis temporibus veniam dolorum maiores quisquam perspiciatis! Magni ad culpa id veniam, voluptas velit praesentium nemo minima excepturi, nobis, doloremque quos! Culpa earum facere cupiditate nesciunt quis consequuntur possimus recusandae necessitatibus. Officia qui aperiam, maiores veniam ab laborum velit voluptatem, asperiores provident excepturi temporibus tempore perspiciatis reprehenderit, sunt! Quae veniam excepturi placeat expedita facilis natus. Labore laudantium porro molestiae cumque est officiis vero dolorum ipsa, quibusdam nulla eveniet a molestias aut, cupiditate nam debitis modi in distinctio, voluptate illum velit! Facilis eaque laborum, assumenda voluptatibus quod maxime nam voluptas, reprehenderit rerum debitis ipsa quam excepturi ipsam unde perferendis. Sit sequi quidem at magni, assumenda odit impedit atque consequuntur nostrum mollitia ipsam, vel pariatur modi unde asperiores iure omnis nobis! Laboriosam officiis quae possimus repellat est maiores provident iste facere commodi error aperiam iusto soluta voluptatem perferendis ea nisi, unde quia cupiditate quas fuga vel.',
                'img/3p.jpg',
                Ruslan.fullName(),
                Ruslan.ava(),
                new Date().getTime(), 144, 0, 35, []),
            new PostsList(
                'Fourth',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Beatae dolorem cupiditate tenetur vitae molestias odit, fugit dignissimos pariatur. Beatae, nisi. Nemo nobis cupiditate dolore ratione, quidem sint incidunt at consequuntur lorem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam est quos, quas! Quaerat suscipit optio delectus, voluptatem itaque reprehenderit ipsa impedit eos, rem similique laborum possimus maiores esse minus. Pariatur Lorem ipsum dolor sit amet, consectetur adipisicing elit. Quo nihil eaque nobis officia eius illum possimus nulla, ad adipisci doloribus cupiditate blanditiis placeat, totam sit. Porro, illo repellat, minus dolore fugit laborum ad officiis optio error. Laborum praesentium at esse necessitatibus explicabo adipisci, quibusdam cumque assumenda optio animi sed ratione, harum accusantium culpa eos labore, ipsam omnis aliquid voluptatem. Est officia reiciendis aliquid, exercitationem repellendus, voluptatum autem hic beatae nemo sit eveniet placeat esse quos commodi incidunt voluptatem doloribus. Voluptates iusto inventore, rem ipsa blanditiis totam temporibus sint itaque at consectetur velit reiciendis voluptate doloribus laborum exercitationem dignissimos doloremque laudantium atque distinctio consequatur. Debitis, maxime optio eveniet minima aliquid sit ipsam tempore adipisci dicta ducimus sint delectus, praesentium libero, incidunt quas! Dicta reiciendis sunt incidunt enim nulla veritatis nemo tempore harum nisi eum quis tempora quo, asperiores nobis architecto, aut voluptates vitae quidem doloribus illo voluptatibus similique! Cum odit minus sunt sequi officiis quae, iste provident. Excepturi magni iure molestias amet eveniet et repellendus earum voluptas. Accusantium magni minus sapiente dolores in quisquam quia neque pariatur animi officiis. Aspernatur amet nam eos in. Delectus itaque quos error reiciendis veritatis distinctio doloremque, ipsa nulla labore nobis, maiores amet, repellendus beatae dignissimos.',
                'img/4p.jpg',
                Artem.fullName(),
                Artem.ava(),
                new Date().getTime(), 154, 0, 134, []),
            new PostsList(
                'Fifth',
                'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Atque harum illum rerum nisi perspiciatis, quos repudiandae qui iste assumenda sed ducimus incidunt et ullam excepturi at consequatur ab inventore dolor lorem   Lorem ipsum dolor sit amet, consectetur adipisicing elit. Aliquid porro, maxime omnis possimus dolore in, debitis, numquam minus doloribus voluptates optio ratione accusantium accusamus voluptas fuga perferendis corporis quia autem Lorem ipsum dolor sit amet, consectetur adipisicing elit. Reprehenderit natus corrupti ex dolore, nemo nesciunt quae nisi. Modi perferendis enim aperiam dolorem perspiciatis reiciendis laboriosam quis assumenda, consequatur et repellendus accusamus commodi minus, ab fugiat ea sint voluptas voluptatem praesentium nihil deserunt temporibus ipsa excepturi illo? Officiis veniam sint recusandae culpa odit iste, in! Provident natus repellat harum eum beatae, porro. Vitae facere repudiandae libero quam mollitia minus, odit, amet in recusandae itaque nostrum. Provident officia earum quo quidem, praesentium magni. Optio voluptas cupiditate quasi sapiente cum natus, suscipit aliquid aliquam dignissimos officiis eaque, omnis repellendus veniam dolore esse, facere blanditiis eum quis. Accusamus, eius deleniti doloribus quis temporibus quidem id tempore aspernatur laborum est blanditiis sed fugit alias culpa exercitationem totam. Nemo doloribus deleniti placeat aliquam unde consequuntur veniam dignissimos consectetur eveniet vel tempora nulla obcaecati, quam facilis. Deserunt quo eveniet, distinctio non ullam tempore dicta doloremque minus sunt adipisci sequi vel voluptatibus numquam architecto alias repellat reiciendis mollitia placeat temporibus ea pariatur quibusdam. Veniam illo reprehenderit in maxime inventore quae repellendus laboriosam ut quas, dolorum voluptate amet placeat, commodi reiciendis corporis libero tempore distinctio officia, excepturi sed assumenda! Expedita vero harum quasi fugiat! Itaque alias eligendi, delectus dolorem.',
                'img/5p.jpg',
                Alex.fullName(),
                Alex.ava(),
                new Date().getTime(), 14, 0, 4, [])
        ]
    );
    self.authorIsVisible = function () {
        this.authorVisibility(true);
    };
    self.authorIsNotVisible = function () {
        this.authorVisibility(false);
    };
    self.dataOnHash = ko.computed(function () {
        var detailOfArticle = [];

        if(self.posts()[thisHash]){
            detailOfArticle.push(self.posts()[thisHash]);
        }
        return detailOfArticle;
    },this);

    self.onChangeRate = function () {

        this.ratingSetted(true);
        this.totalRate(parseFloat(((this.commonRate + this.rate()) / (this.countPeopleRate + 1)).toFixed(2)));
    };

    self.postByRate = ko.computed(function () {
        var sortPosts = self.posts().slice();

        sortPosts.sort(function(x, y){
            return y.totalRate() - x.totalRate();
        });

        return sortPosts.splice(0, 5);
    }, this);

    self.addPost = function () {
        self.posts.unshift(new PostsList(self.title(), self.text(), self.img(), myInfo.fullName(), myInfo.ava(), new Date().getTime(), 0, 0, 0, []));
        self.readVisiblity(true);
    };
    self.queryPost = ko.observable('');

    self.searchResultsPost = ko.computed(function() {
        var q = self.queryPost().toLowerCase();
        if (q) {
            return self.posts().filter(function(i) {
              return i.post_header.toLowerCase().indexOf(q) >= 0;
            });
        }
    });

    self.newCommentText = ko.observable('');
    self.editedCommentText = ko.observable('');

    self.addComment = function () {
        this.commentsArray.unshift(new Comment(myInfo.fullName(), myInfo.ava(), self.newCommentText(), new Date()));
        self.newCommentText('');
    };

    self.editComment = function () {
        this.editCommentVisibility(true);
        self.editedCommentText(this.commentText());
    };

    self.saveEditedComment = function () {
        this.commentText(self.editedCommentText());
        this.editCommentVisibility(false);
    };

    self.deleteComment = function () {
        self.posts()[thisHash].commentsArray.remove(this);
    };
}

function PostsList (title, text, img, author, ava, timestamp, totalRate, rate, countPeopleRate, CommentsArray) {
    var self = this;
    self.post_header = title;
    self.post_main = text;
    self.post_main_cut = self.post_main.slice(0, 150) + '...';
    self.articleImg = img;
    self.ava = ava;
    self.authorVisibility = ko.observable(false);
    self.author = author;
    self.timestamp = timestamp;
    self.time = new Date(timestamp).toString();
    self.countPeopleRate = countPeopleRate;
    self.conditionCountPeopleRate = countPeopleRate || 1;

    var proccessingRate = parseFloat((totalRate / self.conditionCountPeopleRate).toFixed(2));

    self.commonRate = totalRate;
    self.totalRate = ko.observable(proccessingRate);
    self.rate = ko.observable(rate);
    self.ratingSetted = ko.observable(false);
    self.commentsArray = ko.observableArray(CommentsArray);
}
function readURL(input, whatModel) {

    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            if (whatModel) {
                personalInfo.ava(e.target.result);
            } else {
                myViewModel.img(e.target.result);
            }
        };

        reader.readAsDataURL(input.files[0]);
    }
}

$('#fileInput').change( function () {
    var whatModel = $('#profile').length;
    readURL(this, whatModel);
});

var myViewModel = new ViewModel();
if (document.getElementById('viewModel')) {
    ko.applyBindings(myViewModel, document.getElementById('viewModel'));
}

var firstNameField, lastNameField, email, ageField, genderField;

ko.bindingHandlers.validation = {
    update: function (element, valueAccessor, allBindings, bindingContext) {
        var valueUnwrapped = ko.unwrap(valueAccessor());

        function errorValidate (element, text) {

            if (text) {
                $(element).closest('.form-group').attr('class', 'form-group has-error');
                $(element).next('.help-block').html(text);
            } else {
                $(element).closest('.form-group').attr('class', 'form-group has-success');
                $(element).next('.help-block').html(text);
            }
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
                        errorValidate(element, 'This is not a name');
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
                        errorValidate(element, 'This is not a name');
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
                        errorValidate(element, 'This is not an email');
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
                personalInfo.validated(true);
            }
        }
    }
};

var personalInfo = new Personal();
if (document.getElementById('profile')) {
    ko.applyBindings(personalInfo, document.getElementById('profile'));
}

function Users () {
var self = this;
    self.users = ko.observableArray([Ivan, Dmitry, Ruslan, Artem, Alex, myInfo]);
    self.queryUser = ko.observable('');
    self.searchResultsPost = ko.computed(function() {
        var q = self.queryUser().toLowerCase();
        return self.users().filter(function(i) {
          return i.fullName().toLowerCase().indexOf(q) >= 0;
        });
    });
}

var usersList = new Users();
if (document.getElementById('users')) {
    ko.applyBindings(usersList, document.getElementById('users'));
}
