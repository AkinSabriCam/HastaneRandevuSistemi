using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace ModelLayer.DTOs
{
    public class RandevuDonusDTO
    {
        public int randevuID { get; set; }
        public Nullable<System.DateTime> tarih { get; set; }
        public Nullable<System.TimeSpan> saat { get; set; }
        public Nullable<int> doktorID { get; set; }
    }
}
