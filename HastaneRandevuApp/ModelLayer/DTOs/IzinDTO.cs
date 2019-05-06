using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class IzinDTO
    {
        public int izinID { get; set; }
        public Nullable<int> doktorID { get; set; }
        public string doktorAdi { get; set; }
        public string doktorSoyadi { get; set; }
        public Nullable<System.DateTime> baslangicTarihi { get; set; }
        public Nullable<System.DateTime> bitisTarihi { get; set; }
        public Nullable<System.TimeSpan> baslangicSaati { get; set; }
        public Nullable<System.TimeSpan> bitisSaati { get; set; }
    }
}
