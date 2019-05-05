using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class RandevuDTO
    {
        public int randevuID { get; set; }
        public Nullable<System.DateTime> tarih { get; set; }
        public Nullable<System.TimeSpan> saat { get; set; }
        public Nullable<bool> durum { get; set; }
        public Nullable<int> doktorID { get; set; }
        public Nullable<int> kullaniciID { get; set; }

        public string kullaniciAdi { get; set; }
        public string kullaniciSoyadi { get; set; }
        public string doktorAdi  { get; set; }
        public string doktorSoyadi { get; set; }
        public string HastaneAdi { get; set; }
        public string  bolumAdi { get; set; }

    }
}
