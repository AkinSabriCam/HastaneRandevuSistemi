using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class KullaniciDTO
    {
        public int kullaniID { get; set; }
        public string adi { get; set; }
        public string soyadi { get; set; }
        public Nullable<System.DateTime> dogumTarihi { get; set; }
        public Nullable<bool> cinsiyet { get; set; }
        public Nullable<int> ilID { get; set; }
        public string ilAdi { get; set; }
        public Nullable<int> ilceID { get; set; }
        public string ilceAdi { get; set; }
        public string TCKN { get; set; }
        public string acikAdres { get; set; }
        public string telNo { get; set; }
        public string email { get; set; }
        public int rolID { get; set; }
        public string sifre { get; set; }
    }
}
