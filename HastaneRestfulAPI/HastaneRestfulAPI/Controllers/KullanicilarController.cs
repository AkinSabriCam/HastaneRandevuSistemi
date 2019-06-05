using BusinessLogicLayer.BLLs;
using ModelLayer.DTOs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HastaneRestfulAPI.Controllers
{
    public class KullanicilarController : ApiController
    {
        
        public IHttpActionResult Get()
        {
            KullaniciBLL kullaniciBusiness = new KullaniciBLL();
            var model = kullaniciBusiness.Get();
            return Ok(model);
        }

        public IHttpActionResult GetById(int id)
        {
            KullaniciBLL kullaniciBusiness = new KullaniciBLL();
            var model = kullaniciBusiness.GetById(id);
            return Ok(model);
        }

        public IHttpActionResult GetByTcknPassword(string tckn,string password)
        {
            KullaniciBLL kullaniciBusiness = new KullaniciBLL();
            var model =kullaniciBusiness.GetByTcknPassword(tckn,password);
            return Ok(model);
        }


        [HttpPost]
        public IHttpActionResult Add(KullaniciDTO model)
        {
            KullaniciBLL kullaniciBusiness = new KullaniciBLL();
            kullaniciBusiness.Add(model);
            return Ok();
        }
        [HttpPut]
        public IHttpActionResult Update(KullaniciDTO model)
        {
            KullaniciBLL kullaniciBusiness = new KullaniciBLL();
            kullaniciBusiness.Update(model);
            return Ok();
        }

    }
}
