using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class FavoriDTO
    {
        public int favoriID { get; set; }
        public Nullable<int> doktorID { get; set; }
        public string doktorAdi { get; set; }
        public string doktorSoyadi { get; set; }
        public Nullable<int> kullaniciID { get; set; }
        public string kullaniciAdi { get; set; }
        public string kullaniciSoyadi { get; set; }

        public string hastaneAdi { get; set; }
        public string bolumAd { get; set; }

    }
}
