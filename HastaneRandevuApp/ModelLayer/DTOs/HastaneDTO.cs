using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class HastaneDTO
    {
        public int hastaneID { get; set; }
        public string hastaneAdi { get; set; }
        public Nullable<int> ilID { get; set; }
        public string ilAdi { get; set; }
        public Nullable<int> ilceID { get; set; }
        public string ilceAdi { get; set; }
        public string acikAdres { get; set; }
    }
}
