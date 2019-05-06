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
            :base(@"metadata = res://*/Models.HastaneDB.csdl|res://*/Models.HastaneDB.ssdl|res://*/Models.HastaneDB.msl;provider=System.Data.SqlClient;provider connection string=';data source=USER\SQLEXPRESS;initial catalog=HastaneRandevuSistemi;integrated security=True;MultipleActiveResultSets=True;App=EntityFramework&quot';")
        {

        }
    }
}
