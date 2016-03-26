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
   public class StudentService : BaseService
    {
        StudentRepository studentReository;
        CityRepository cityRepository;

        public StudentService(BusinessDbContext db): base(db)
        {
            studentReository = new StudentRepository(_dbContext);
            cityRepository = new CityRepository(_dbContext);
        }

        public List<StudentViewModel> GetAll()
        {
            IQueryable<Student> queryable = studentReository.GetAll();
            var studentViewModels = queryable.ToList().Select(x => new StudentViewModel(x)).ToList();
            return studentViewModels;
        }

        public string Save(Student student)
        {
            bool cityExist = cityRepository.CityExists(student.City);
            if (!cityExist)
            {
                throw new ArgumentException("City Does not Exists");
                
            }

            return studentReository.Add(student);


        }

       
        public bool EmailExists(string email)
        {
            return studentReository.EmailExists(email);
            
        }
    }
}
