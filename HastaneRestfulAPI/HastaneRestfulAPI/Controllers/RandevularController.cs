using BusinessLogicLayer.BLLs;
using ModelLayer.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Net.Mail;
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
        public IHttpActionResult GetForUser(DateTime tarih, int doktorId,int kullaniciId)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var model = randevuBusiness.GetForUser(tarih, doktorId,kullaniciId);
            if (model == null)
            {
                return NotFound();
            }
            else
            {
                return Ok(model);
            }
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
        public IHttpActionResult GetOldByDoktorId(int id)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var model = randevuBusiness.GetOldByDoktorId(id);
            return Ok(model);
        }

        [HttpPost]
        public IHttpActionResult  Add(Randevu model)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            if (randevuBusiness.Add(model))
            {
                return Ok();

            }
            else
            {
                return BadRequest();
            }
        }
        [HttpGet]
        public IHttpActionResult Kontrol(int kullaniciId,int doktorId,DateTime tarih)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            var test = randevuBusiness.CheckSameDoctor(kullaniciId, doktorId, tarih);
            if (test)
            {
                return Ok();
            }
            else
            {
                return NotFound();
            }
        }


        [HttpDelete]
        public IHttpActionResult DeleteByUser(int id)
        {
            RandevuBLL randevuBusiness = new RandevuBLL();
            randevuBusiness.Delete(id);
            return Ok();
        }

        [HttpDelete]
        public IHttpActionResult DeleteByDoktor(int id)
        {
            // doktor delete işleminin ayrı metod içinde yapılmasının nedeni email gönderme işlemininde buradan tetiklenecek olmasıdır.
            RandevuBLL randevuBusiness = new RandevuBLL();
            var randevu = randevuBusiness.GetById(id);
            KullaniciBLL kullaniciBusiness = new KullaniciBLL();
            var kullanici = kullaniciBusiness.GetById((int)randevu.kullaniciID);
            randevuBusiness.Delete(id);
            MailGonder(randevu.doktorAdi, randevu.doktorSoyadi, kullanici.email, (DateTime)randevu.tarih, (TimeSpan)randevu.saat);
            return Ok();
        }

        private bool MailGonder(string doktorAdi, string doktorSoyadi, string email, DateTime tarih, TimeSpan saat)
        {
            System.Globalization.CultureInfo cultureInfo = System.Threading.Thread.CurrentThread.CurrentCulture;
            System.Globalization.TextInfo textInfo = cultureInfo.TextInfo;
            MailMessage ePosta = new MailMessage();
            ePosta.From = new MailAddress("groupbyazilim@gmail.com");
            ePosta.To.Add(email);
            ePosta.Subject = "Randevu Hakkında";
            ePosta.Body = doktorAdi +" " +doktorSoyadi+ " isimli doktordan " + tarih+" - "+saat + " tarihli randevunuz iptal edilmiştir.";

            SmtpClient smtp = new SmtpClient();

            // Gönderenin eposta giriş bilgileri
            smtp.Credentials = new System.Net.NetworkCredential("groupbyazilim@gmail.com", "159654357456");
            smtp.Port = 587;
            smtp.Host = "smtp.gmail.com";
            smtp.EnableSsl = true;
            object userState = ePosta;
            try
            {
                smtp.SendAsync(ePosta, (object)ePosta);
                return true;
            }
            catch (SmtpException ex)
            {
                throw new SmtpException(ex.ToString());
            }
        }
    }

    }

