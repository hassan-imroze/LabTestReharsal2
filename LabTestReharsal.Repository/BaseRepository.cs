using LabTestReharsal.Model;
using System;
using System.Collections.Generic;
using System.Data.Entity;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabTestReharsal.Repository
{
    public abstract class BaseRepository<T> where T : Entity
    {
        protected BusinessDbContext Db { get; set; }

        protected BaseRepository(BusinessDbContext db)
        {
            this.Db = db;
        }

        public virtual IQueryable<T> GetAll()
        {

            IQueryable<T> query = this.Db.Set<T>();
            return query;
        }

        public virtual void Add(T entity)
        {
            Db.Set<T>().Add(entity);
        }


        public virtual void Edit(T entity)
        {
            Db.Entry(entity).State = EntityState.Modified;
        }

        public virtual void Delete(T entity)
        {
            Db.Set<T>().Remove(entity);
        }

        public virtual T Find(T entity)
        {
           return  Db.Set<T>().Find(entity.Id);
        }

        public virtual void Save()
        {
            Db.SaveChanges();
        }

    }
}
