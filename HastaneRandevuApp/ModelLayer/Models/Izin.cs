//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace ModelLayer.Models
{
    using System;
    using System.Collections.Generic;
    
    public partial class Izin
    {
        public int izinID { get; set; }
        public Nullable<int> doktorID { get; set; }
        public Nullable<System.DateTime> baslangicTarihi { get; set; }
        public Nullable<System.DateTime> bitisTarihi { get; set; }
        public Nullable<System.TimeSpan> baslangicSaati { get; set; }
        public Nullable<System.TimeSpan> bitisSaati { get; set; }
    
        public virtual Doktor Doktor { get; set; }
    }
}
