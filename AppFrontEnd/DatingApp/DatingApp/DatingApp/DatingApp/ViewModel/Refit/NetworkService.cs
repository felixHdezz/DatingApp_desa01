using Refit;
using System;
using System.Collections.Generic;
using System.Text;

namespace DatingApp.ViewModel.Refit
{
    public static class NetworkService
    {
        public static IApiService apiService;
        static string baseUrl = "https://innovat1.mx/gmural/serverpruebas";

        public static IApiService GetApiService()
        {
            if (apiService == null)
                return apiService = RestService.For<IApiService>(baseUrl);

            return apiService;
        }

    }
}
