using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class DoktorDTO
    {
        public int doktorID { get; set; }
        public string TCKN { get; set; }
        public string sifre { get; set; }
        public string adi { get; set; }
        public string soyadi { get; set; }

        public string hastaneAdi { get; set; }
        public string bolumAdi { get; set; }

        public Nullable<int> hastaneID { get; set; }
        public Nullable<int> bolumID { get; set; }
    }
}
