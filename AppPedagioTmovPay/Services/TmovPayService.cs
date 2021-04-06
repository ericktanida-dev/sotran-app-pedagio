using AppPedagioTmovPay.Services.Interfaces;
using AppPedagioTmovPay.Dtos;
using AppPedagioTmovPay.Providers.CardReader.Models;
using AppPedagioTmovPay.Providers.Helper;
using Microsoft.Extensions.Configuration;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text;
using System.Threading.Tasks;

namespace AppPedagioTmovPay.Services
{
    public class TmovPayService : ITmovPayService
    {
        private readonly IHttpClientFactory _clientFactory;
        private readonly IConfiguration _configuration;
        public TmovPayService(
            IHttpClientFactory clientFactory,
            IConfiguration configuration)
        {
            _clientFactory = clientFactory;
            _configuration = configuration;
        }

        private async Task<AuthResponseDto> GetToken(HttpClient client)
        {
            var username = _configuration["ApiTmovPay:Auth:Username"];
            var password = _configuration["ApiTmovPay:Auth:Password"];

            var body = new FormUrlEncodedContent(new Dictionary<string, string>()
                {
                    {"grant_type", "password"},
                    {"username", username},
                    {"password", password},
                }
            );
            HttpResponseMessage response = null;
            try
            {
                response = await client.PostAsync("/tmov-pay/token", body);
            }
            catch (Exception ex)
            {
            }

            if (response == null || !response.IsSuccessStatusCode)
            {
                throw new AppException(response != null ? (int)response.StatusCode : (int)System.Net.HttpStatusCode.InternalServerError,
                    "Falha durante o processo de autenticação do tmov pay!", false, null); //NotificaEmail()
            }

            var json = await response.Content.ReadAsStringAsync();

            var objeto = JsonConvert.DeserializeObject<AuthResponseDto>(json);

            return objeto;
        }

        private HttpClient GetClient()
        {
            var client = _clientFactory.CreateClient();
            var baseUrl = _configuration["ApiTmovPay:Url"];

            client.BaseAddress = new Uri(baseUrl);

            return client;
        }

        private async Task<HttpClient> GetClientAuthenticated()
        {
            var client = GetClient();
            var auth = await GetToken(client);
            client.DefaultRequestHeaders.Add("Authorization", $@"Bearer {auth.AccessToken}");
            client.DefaultRequestHeaders.Add("userinfo", auth.IdToken);
            return client;
        }

        public async Task<RechargeValueResponse> PreparaValorRecarga(IList<FetchRechargeResponse> request)
        {
            var client = await GetClientAuthenticated();

            var payload = JsonConvert.SerializeObject(request);
            var body = new StringContent(payload, Encoding.UTF8, "application/json");


            var response = await client.PostAsync($@"cartoes/preparaValorRecarga", body);

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/consultar/recarga) - Erro ao consultar no TmovPay por PAN!", false, "", json);// NotificarEmail()
            }

            var objeto = JsonConvert.DeserializeObject<RechargeValueResponse>(json);

            return objeto;
        }
        public async Task<RechargeValueResponse> PreparaValorEstorno(IList<FetchRechargeResponse> request)
        {
            var client = await GetClientAuthenticated();

            var payload = JsonConvert.SerializeObject(request);
            var body = new StringContent(payload, Encoding.UTF8, "application/json");


            var response = await client.PostAsync($@"cartoes/preparaValorEstorno", body);

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/consultar/recarga) - Erro ao consultar no TmovPay por PAN!", false, "", json);// NotificarEmail()
            }

            var objeto = JsonConvert.DeserializeObject<RechargeValueResponse>(json);

            return objeto;
        }


        public async Task<RechargeCardResponse> SolicitarRecarga(PanDto requestDto)
        {
            var client = await GetClientAuthenticated();

            var payload = JsonConvert.SerializeObject(requestDto);
            var body = new StringContent(payload, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("cartoes/solicitarRecarga", body);

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/solicitarRecarga) - Erro ao solicitar recarga no tmov pay!", false, payload, json);// NotificarEmail()
            }

            var objeto = JsonConvert.DeserializeObject<RechargeCardResponse>(json);

            return objeto;
        }

        
        public async Task<RechargeCardResponse> SolicitarEstorno(PanDto requestDto)
        {
            var client = await GetClientAuthenticated();

            var payload = JsonConvert.SerializeObject(requestDto);
            var body = new StringContent(payload, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("cartoes/solicitarEstorno", body);

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/solicitarRecarga) - Erro ao solicitar recarga no tmov pay!", false, payload, json);// NotificarEmail()
            }

            var objeto = JsonConvert.DeserializeObject<RechargeCardResponse>(json);

            return objeto;
        }

        public async Task<bool> ConfirmarRecarga(ConfirmRechargeCard requestDto)
        {
            var client = await GetClientAuthenticated();

            var payload = JsonConvert.SerializeObject(requestDto);
            var body = new StringContent(payload, Encoding.UTF8, "application/json");

            var response = await client.PostAsync("cartoes/confirmarRecarga", body);

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/confirmarRecarga) - Erro ao confirmar recarga no tmov pay!", false, payload, json);// NotificarEmail()
            }

            return true;
        }

        public async Task<FindByPanResponse> buscarDadosPorPan(string pan)
        {
            var client = await GetClientAuthenticated();
            var response = await client.GetAsync($@"cartoes/buscarDadosPorPan/{pan}");

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/buscarDadosPorPan) - Erro ao confirmar recarga no tmov pay!", false, pan, json);// NotificarEmail()
            }

            var objeto = JsonConvert.DeserializeObject<FindByPanResponse>(json);

            return objeto;
        }

        public async Task<FindByPanResponse> buscarPedagiosPorPan(string pan)
        {
            var client = await GetClientAuthenticated();
            var response = await client.GetAsync($@"cartoes/buscarPedagiosPorPan/{pan}");

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/buscarPedagiosPorPan) - Erro ao confirmar recarga no tmov pay!", false, pan, json);// NotificarEmail()
            }

            var objeto = JsonConvert.DeserializeObject<FindByPanResponse>(json);

            return objeto;
        }

        public async Task<IList<FetchRechargeResponse>> ConsultarRecarga(string pan)
        {
            var client = await GetClientAuthenticated();

            var response = await client.GetAsync($@"cartoes/buscarPedagiosPorPan/{pan}");

            var json = await response.Content.ReadAsStringAsync();

            if (!response.IsSuccessStatusCode)
            {
                throw new AppException((int)response.StatusCode, $@"POST (cartoes/consultar/recarga) - Erro ao consultar no TmovPay por PAN!", false, pan, json);// NotificarEmail()
            }

            var objeto = JsonConvert.DeserializeObject<IList<FetchRechargeResponse>>(json);

            return objeto;
        }
    }
}
