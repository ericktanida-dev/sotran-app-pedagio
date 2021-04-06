using AppPedagioTmovPay.Providers.CardReader.Implementations;
using AppPedagioTmovPay.Providers.CardReader.Interfaces;
using AppPedagioTmovPay.Services;
using AppPedagioTmovPay.Services.Interfaces;
using ElectronNET.API;
using ElectronNET.API.Entities;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.SpaServices.ReactDevelopmentServer;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;


namespace AppPedagioTmovPay
{
    public class Startup
    {
        public Startup(IConfiguration configuration)
        {
            Configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        public void ConfigureServices(IServiceCollection services)
        {

            services.AddControllersWithViews();

            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "ClientApp/build";
            });

            services.AddHttpClient();

            services.AddSingleton<ICardReaderProvider, HSTChipAPI>();
            services.AddTransient<ITmovPayService, TmovPayService>();
            services.AddTransient<IPedagioService, PedagioService>();
            
        }

        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseExceptionHandler("/Error");
                app.UseHsts();
            }

            app.UseHttpsRedirection();
            app.UseStaticFiles();
            app.UseSpaStaticFiles();

            app.UseRouting();

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller}/{action=Index}/{id?}");
            });

            app.UseSpa(spa =>
            {
                spa.Options.SourcePath = "ClientApp";

                if (env.IsDevelopment())
                {
                    spa.UseReactDevelopmentServer(npmScript: "start");
                }
            });

            ElectronBootstrap();
        }

        public async void ElectronBootstrap()
        {
            BrowserWindow browserWindow = await Electron.WindowManager.CreateWindowAsync(new BrowserWindowOptions
            {
                Title = Program.AppName,
                Width = 1024,
                Height = 768,
                AutoHideMenuBar = true,
                WebPreferences = new WebPreferences { NodeIntegration = false }
            });

            await browserWindow.WebContents.Session.ClearCacheAsync();

            //MenuItem[] contextMenu = new MenuItem[] {
            //    new MenuItem { Label = "Copy", Accelerator = "CmdOrCtrl+C", Role = MenuRole.copy }
            //};

            //Electron.Menu.SetContextMenu(browserWindow, contextMenu);

            browserWindow.OnReadyToShow += () =>
            {
                browserWindow.Show();
            };
        }

    }
}
