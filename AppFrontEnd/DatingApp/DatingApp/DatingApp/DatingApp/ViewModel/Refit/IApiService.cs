using Refit;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace DatingApp.ViewModel.Refit
{
    public interface IApiService
    {
        //ejemplo
        [Post("/token")]
        Task<HttpResponseMessage> postToken(
           [Header("X-Tenant-Id")] string strTenant,
           [Header("X-Dis-Id")] string strDisID,
           [Body(BodySerializationMethod.UrlEncoded)] Dictionary<string, object> body
           );

        [Get("/api/v0.2/usuarios/{llavePersonal}")]
        Task<HttpResponseMessage> GetUser(int llavePersonal,
            [Header("X-Tenant-Id")] string strTenant,
            [Header("X-Dis-Id")] string strDisId,
            [Header("Authorization")]string strAccessToken);
    }
}
