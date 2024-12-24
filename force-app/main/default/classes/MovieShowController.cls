public with sharing class MovieShowController 
{
    @AuraEnabled(cacheable=true)
    public static List<Movie_Showing__c> getShows(){
        return [SELECT Id, Name
                FROM Movie_Showing__c
                WITH SECURITY_ENFORCED];
    }
}