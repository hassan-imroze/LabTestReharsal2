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
    public class StudentController : BaseController
    {
        StudentService service;
        public StudentController()
        {
            service = new StudentService(db);
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
                List<StudentViewModel> models = service.GetAll();
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
                
                return Ok(service.EmailExists(email));
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
                string id = service.Save(student);
                return Ok(id);
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