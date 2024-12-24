public with sharing class MovieController {
    
    @AuraEnabled(cacheable=true)
    public static List<Movie_Title__c> getMovies(){
        return [SELECT Id, Name 
                FROM Movie_Title__c 
                WITH SECURITY_ENFORCED];
    }
}