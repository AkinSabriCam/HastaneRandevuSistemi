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
    
    public partial class Hastane
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Hastane()
        {
            this.Bolum = new HashSet<Bolum>();
            this.Doktor = new HashSet<Doktor>();
        }
    
        public int hastaneID { get; set; }
        public string hastaneAdi { get; set; }
        public Nullable<int> ilID { get; set; }
        public Nullable<int> ilceID { get; set; }
        public string acikAdres { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Bolum> Bolum { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Doktor> Doktor { get; set; }
        public virtual Il Il { get; set; }
        public virtual Ilce Ilce { get; set; }
    }
}
