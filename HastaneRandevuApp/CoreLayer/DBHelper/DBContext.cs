using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace CoreLayer.DBHelper
{
    public class DBContext: DbContext
    {
        public DBContext()
            : base(@"metadata=res://*/Models.HastaneDb.csdl|res://*/Models.HastaneDb.ssdl|res://*/Models.HastaneDb.msl;provider=System.Data.SqlClient;provider connection string=';data source=hastane.database.windows.net;initial catalog=HastaneRandevuSistemi;user id=akin;password=sabri3452.;MultipleActiveResultSets=True;App=EntityFramework&quot';")
        {

        }
    }
}
