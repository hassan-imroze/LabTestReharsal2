using LabTestReharsal.Model;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace LabTestReharsal.Repository
{
    public class CityRepository : BaseRepository<City>
    {
        public CityRepository(BusinessDbContext db) : base(db)
        {

        }
      
        public bool CityExists(string cityName)
        {
            return Db.Cities.Any(x=>x.Name.Trim().ToLower() == cityName.Trim().ToLower());
        }
    }
}

