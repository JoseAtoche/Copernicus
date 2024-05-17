using Core.Models;
using System;
using System.Collections.Generic;
using System.Net.Http;
using System.Text.Json;
using System.Threading;
using System.Threading.Tasks;

namespace Repository.Repository
{
    public class RecoveryData
    {
        private static readonly HttpClient httpClient = new();

        public static async Task<List<Customer>> RecoveryDataGithubAsync(string url, CancellationToken cancellationToken = default)
        {
            try
            {
                // Make the HTTP GET request and get the response
                HttpResponseMessage response = await httpClient.GetAsync(url, cancellationToken);

                // Check if the request was successful (status code 200)
                if (response.IsSuccessStatusCode)
                {
                    // Read the content as a JSON string
                    string jsonString = await response.Content.ReadAsStringAsync(cancellationToken);

                    // Deserialize the JSON string into a list of Customer objects
                    var customers = JsonSerializer.Deserialize<List<Customer>>(jsonString, new JsonSerializerOptions
                    {
                        PropertyNameCaseInsensitive = true
                    });

                    return customers;
                }
                else
                {
                    Console.WriteLine($"Error: {response.StatusCode}");
                    return null;
                }
            }
            catch (HttpRequestException ex)
            {
                Console.WriteLine($"HTTP request error: {ex.Message}");
                return null;
            }
            catch (JsonException ex)
            {
                Console.WriteLine($"JSON deserialization error: {ex.Message}");
                return null;
            }
            catch (OperationCanceledException)
            {
                Console.WriteLine("The operation was canceled.");
                return null;
            }
            catch (Exception ex)
            {
                Console.WriteLine($"An unexpected error occurred: {ex.Message}");
                return null;
            }
        }
    }
}
