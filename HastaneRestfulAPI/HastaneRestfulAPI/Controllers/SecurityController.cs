using BusinessLogicLayer.BLLs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using System.Web.Security;

namespace HastaneRestfulAPI.Controllers
{
    public class SecurityController : ApiController
    {
        [HttpGet]
        public IHttpActionResult Login(string tckn, string password)
        {
            
            KullaniciBLL kullaniciBusiness = new KullaniciBLL();
            var model = kullaniciBusiness.GetByTcknPassword(tckn, password);
            if (model != null)
            {
                FormsAuthentication.SetAuthCookie(model.TCKN, false);
                
                return Ok(model);
            }
            else
            {
                return NotFound();
            }

        }
        [HttpGet]
        public IHttpActionResult Logind(string tckn, string password)
        {

            DoktorBLL doktorBusiness = new DoktorBLL();
            var model = doktorBusiness.GetByTcknPassword(tckn, password);
            if (model != null)
            {
                FormsAuthentication.SetAuthCookie(model.TCKN, false);

                return Ok(model);
            }
            else
            {
                return NotFound();
            }

        }
        public IHttpActionResult Logout()
        {
            FormsAuthentication.SignOut();

            return Ok();
        }

    }
}
