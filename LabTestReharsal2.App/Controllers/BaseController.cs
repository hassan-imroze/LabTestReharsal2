using LabTestReharsal.Model;
using LabTestReharsal.Service;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Http;
using System.Web.Mvc;

namespace LabTestReharsal.App.Controllers
{
    public class BaseController<T> : ApiController where T : Entity
    {
            protected BaseService<T> service;

        // GET: Base
            public BaseController(BaseService<T> service)
            {
                this.service = service;
            }
    }
}