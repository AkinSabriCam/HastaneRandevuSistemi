using BusinessLogicLayer.BLLs;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;

namespace HastaneRestfulAPI.Controllers
{
    public class IlceController : ApiController
    {
        public IHttpActionResult Get()
        {
            IlceBLL ilceBusiness = new IlceBLL();
            var model=ilceBusiness.Get();
            return Ok(model);
        }
        public IHttpActionResult GetById(int id)
        {
            IlceBLL ilceBusiness = new IlceBLL();
            var model=ilceBusiness.GetById(id);
            return Ok(model);
        }

        public IHttpActionResult GetByIlid(int id)
        {
            IlceBLL ilceBll = new IlceBLL();
            var model=ilceBll.GetByIlId(id).ToList();
            return Ok(model);
        }

    }
}
