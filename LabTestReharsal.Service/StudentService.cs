using LabTestReharsal.Model;
using LabTestReharsal.Repository;
using LabTestReharsal.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabTestReharsal.Service
{
   public class StudentService : BaseService<Student>
    {
        
        CityRepository cityRepository;

        public StudentService(BusinessDbContext db): base(new StudentRepository(db))
        {
            cityRepository = new CityRepository(db);
        }

        public List<StudentViewModel> GetAll()
        {
            IQueryable<Student> queryable = base.GetAll();
            var studentViewModels = queryable.ToList().Select(x => new StudentViewModel(x)).ToList();
            return studentViewModels;
        }

        public override bool  Save(Student student)
        {
            bool cityExist = cityRepository.CityExists(student.City);
            if (!cityExist)
            {
                throw new ArgumentException("City Does not Exists");      
            }

            return base.Save(student);


        }

        public bool EmailExists(string email)
        {
            return ((StudentRepository)base.repository).EmailExists(email);
            
        }
    }
}
