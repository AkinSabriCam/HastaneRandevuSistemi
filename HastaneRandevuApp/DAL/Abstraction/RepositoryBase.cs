using CoreLayer.DBHelper;
using DAL.Abstraction;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;

namespace DAL.Abstraction
{
    public abstract class RepositoryBase<TEntity> : IRepository<TEntity> where TEntity : class
    {
        public void Add(TEntity model)
        {
            using (DBContext db =new DBContext())
            {
                try {
                    DbSet<TEntity> table = db.Set<TEntity>();
                    table.Add(model);
                    db.SaveChanges();
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Delete(int id)
        {
            using (DBContext db =new DBContext())
            {
                try
                {              
                    DbSet<TEntity> table = db.Set<TEntity>();
                    var model = table.Find(id);
                    table.Remove(model);
                    db.SaveChanges();
                }
                catch
                {
                    throw;
                }
            }
            
        }

        public IEnumerable<TEntity> Get(params Expression<Func<TEntity, object>>[] includes)
        {
            using (DBContext db = new DBContext())
            {
                try
                {
                    IQueryable<TEntity> table = db.Set<TEntity>();
                    
                    foreach(Expression<Func<TEntity, object>> inc in includes)
                    {
                        table = table.Include(inc); 
                    }

                    return table.ToList();
                }
                catch
                {
                    throw;
                }
            }
        }

        public IEnumerable<TEntity> GetByFilter(System.Linq.Expressions.Expression<Func<TEntity, bool>> predicate)
        {
            using (DBContext db = new DBContext())
            {
                try {
                    DbSet<TEntity> table = db.Set<TEntity>();
                    return table.Where(predicate).ToList();
                }
                catch
                {
                    throw;
                }
            }
        }

        public TEntity GetById(int id)
        {
            using (DBContext db = new DBContext())
            {
                try
                {
                    DbSet<TEntity> table = db.Set<TEntity>();
                    var model = table.Find(id);
                    return model;
                }
                catch
                {
                    throw;
                }
            }
        }

        public void Update(TEntity model)
        {
            using (DBContext db= new DBContext())
            {
                try
                {
                    DbSet<TEntity> table = db.Set<TEntity>();
                    table.Attach(model);
                    db.Entry(model).State = EntityState.Modified;
                    db.SaveChanges();
                }
                catch
                {
                    throw;
                }
            }
        }
        //public IEnumerable<TEntity> Include(DbSet<TEntity> dbSet)
        //{
        //    using (DBContext db = new DBContext())
        //    {
        //        //IDbSet<TEntity> dbSet = db.Set<TEntity>();

        //        IEnumerable<TEntity> query = null;
        //        foreach (var include in includes)
        //        {
        //            query = dbSet.Include(include);
        //        }

        //        return query ?? dbSet;
        //    }
        //}
    }
}
