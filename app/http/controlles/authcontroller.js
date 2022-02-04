const User = require('../../models/user')  //> here  we are importing user model this model present in model folder
const bcrypt = require('bcrypt');    //# importing the bcrypt library
const passport = require('passport');
//~^ Here we are written logic of the project
const authController = ()=>{
    const _getRedirectUrl = (req)=>{
        return req.user.role === 'admin' ? '/admin/orders' : '/customer/orders'
    }

    return{
        login(req, res) {
            res.render('Auth/login.ejs');
        },
        postLogin(req, res, next){
            const {email, password} = req.body
            //^ Validate request
            if(!email ||!password){
                req.flash('error', 'All Field ae required')  //* this is for sending the error messages to views using flash library
                return res.redirect('/login')
            }
            passport.authenticate('local', (err, user, info)=>{
                if(err){
                    req.flash('error', info.message)
                    return next(err)
                }
                if(!user){
                    req.flash('error', info.message)
                    return res.redirect('/login')
                }
                req.login(user, (err)=>{
                    if(err){
                        req.flash('error', info.message)
                    return next(err)

                    }

                    return res.redirect(_getRedirectUrl(req))
                })
            })(req, res, next)
        },
        register(req, res) {
            res.render('Auth/register.ejs');
        },
        async postRegister(req,res){
            const {name, email, password} = req.body  //! here we are define variable this is as same as name attributes in input field
            //^ Validate request
            if(!name || !email ||!password){
                req.flash('error', 'All Field ae required')  //* this is for sending the error messages to views using flash library
                req.flash('name',name)  //^ to send back data to the view pages
                req.flash('email',email)
                return res.redirect('/register')
            }

            //~#check email is exist in database or not
//email is database fields ||   2nd email is values get from views name attributes 
            User.exists({email:email},(error, result)=>{
                if(result){
                    req.flash('error','Email Already Exist');
                    req.flash('name', name);
                    req.flash('email', email);
                    return res.redirect('/register')
                }
            })

            //~^ Hash password use the bcrypt library is use
            const hashedPassword = await bcrypt.hash(password, 10)

            //~> Create a user
            const user = new User({
                // name,   both values are same we can use like that
                // email,
                name: name,
                email: email,
                password:hashedPassword
            })

            user.save().then((user)=>{
            //#login

                return res.redirect('/')
            }).catch(err =>{
                req.flash('error','Something Went Wrong')
                return res.redirect('/register')
            })

            //console.log(req.body)
        }, 
        
        logout(req, res){
            req.logout();
            return res.redirect('/login')
        }
    }
}
module.exports = authController