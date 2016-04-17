using LabTestReharsal.Model;
using LabTestReharsal.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabTestReharsal.Service
{
    public class BaseService<T> where T : Entity
    {
        protected BaseRepository<T> repository;

        public BaseService(BaseRepository<T> repository)
        {
            this.repository = repository;
        }

        public virtual IQueryable<T> GetAll()
        {
            return this.repository.GetAll();
        }

        public virtual bool Save(T entity)
        {
            if(repository.Find(entity)!=null)
            {
                repository.Edit(entity);
            }else
            { 
                repository.Add(entity);
            }
            repository.Save();
            return true;
        }

    }
}
