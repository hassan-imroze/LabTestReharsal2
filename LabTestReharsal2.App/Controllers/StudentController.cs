using LabTestReharsal.Model;
using LabTestReharsal.Service;
using LabTestReharsal.ViewModel;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;
using System.Web.Security;

namespace LabTestReharsal.App.Controllers
{
    public class StudentController : BaseController<Student>
    {
        
        public StudentController():base(new StudentService(new BusinessDbContext()))
        {
            
        }

        [System.Web.Http.Authorize(Roles = "Owner,Customer")]
        // GET: Student
        public IHttpActionResult Get()
        {
            try
            {
                if(User.IsInRole("Owner"))
                {  

                }
                else
                {

                }
                List<StudentViewModel> models = ((StudentService)service).GetAll();
                return Ok(models);
            }
            catch (Exception ex)
            {

                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        [System.Web.Http.HttpGet]
        public IHttpActionResult EmailExists(string email)
        {
            try
            {
                
                return Ok(((StudentService)service).EmailExists(email));
            }
            catch (Exception ex)
            {

                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
        }

        public IHttpActionResult Post(Student student)
        {
            if (string.IsNullOrWhiteSpace(student.Id))
                student.Id = Guid.NewGuid().ToString();

            try
            {
                bool saved = service.Save(student);
                return Ok(saved);
            }
            catch (ArgumentException ex)
            {
                return Content(HttpStatusCode.BadRequest, ex.Message);
            }
            catch (Exception ex)
            {

                return Content(HttpStatusCode.InternalServerError, ex.Message);
            }
        }
    }
}