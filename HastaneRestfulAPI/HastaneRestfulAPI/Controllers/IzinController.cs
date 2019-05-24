using BusinessLogicLayer.BLLs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HastaneRestfulAPI.Controllers
{
    public class IzinController : ApiController
    {
        [HttpPost]
        public IHttpActionResult Add(Izin model)
        {
            IzinBLL izinBusiness = new IzinBLL();
            izinBusiness.Add(model);
            return Ok();
        }
    }
}
