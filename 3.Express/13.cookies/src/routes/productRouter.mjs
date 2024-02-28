import { Router } from "express";
import cookieParser from "cookie-parser"
 const router = Router()
 router.use(cookieParser());

 //sending a cookie to the server
// Route to receive cookies

router.use(cookieParser()) 
router.get("/api/products", (req, res) => {
       console.log('cookies:' ,req.cookies)
       //pretending that we need to validate the cookie before 
       //sending the products
       //simulating authentications
       //check difference between req.cookies.hello && req.cookies.hello === "world"
       //and req.cookies.hello && req.cookies.hello === "world" req.signedCookies.hello && req.signedCookies.hello === "world"
       console.log('cookies:' ,req.cookies)
       console.log('signedcookies:' ,req.signedCookies.cookie_name)
       if(req.signedCookies.cookie_name && req.signedCookies.cookie_name === "cookie_name") {
         return res.send([{ id: "gjhbfghjghd", name: "iphone 12" }]);
       }   
        

        //else send an error message 
        // /  res.cookie('hello', 'world', {maxAge: 10000}) // cookie destroyed after 10 sec
        //hence if cookie destroyed and go again to the route, will bring error
     return res.status(403).send({msg: "sorry, youi need the correct cookie"})
  });
 
//another thing also make sure, you access the cookie on same route you passed e.g 
// "/" cants access cookie on "/api/prods"  
//install cookie parser  
//make sure you paarse it 
//cookies: { hello: 'world' }
 export default router   