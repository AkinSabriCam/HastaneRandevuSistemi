using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class HastaneBolumDTO
    {
        public int hastaneBolumID { get; set; }
        public Nullable<int> bolumID { get; set; }
        public Nullable<int> hastaneID { get; set; }

        public string bolumAdi { get; set; }

    }
}
