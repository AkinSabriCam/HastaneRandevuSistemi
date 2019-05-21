using BusinessLogicLayer.BLLs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HastaneRestfulAPI.Controllers
{
    public class RandevularController : ApiController
    {
        public IHttpActionResult Get()
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var model = randevuBusiness.Get();
            return Ok(model);
        }
        public IHttpActionResult GetById(int id)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var model = randevuBusiness.GetById(id);
            return Ok(model);
        }

        public IHttpActionResult GetByUserId(int id)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var model = randevuBusiness.GetByUserId(id);
            return Ok(model);
        }

        public IHttpActionResult GetOldByUserId(int id)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var model = randevuBusiness.GetOldByUserId(id);
            return Ok(model);
        }

        public IHttpActionResult GetByDoktorId(int id)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var model = randevuBusiness.GetByDoktorId(id);
            return Ok(model);
        }

        public IHttpActionResult  Add(int userId,int doktorId,DateTime tarih,TimeSpan saat)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            randevuBusiness.Add(userId, doktorId, tarih, saat);
            return Ok();
        }

        public IHttpActionResult DeleteByUser(int id)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            randevuBusiness.Delete(id);
            return Ok();
        }

        public IHttpActionResult DeleteByDoktor(int id)
        {
            // doktor delte işleminin ayrı metod içinde yapılmasının nedeni email gönderme işlemininde buradan tetiklenecek olmasıdır.
            RandevuBLL randevuBusiness = new RandevuBLL();
            randevuBusiness.Delete(id);
            return Ok();
        }

    }
}
