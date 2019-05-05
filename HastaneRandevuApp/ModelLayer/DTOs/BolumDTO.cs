using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class BolumDTO
    {

        public int bolumID { get; set; }
        public string bolumAdi { get; set; }
        public Nullable<int> hastaneID { get; set; }
        public string hastaneAdi { get; set; }
    }
}
