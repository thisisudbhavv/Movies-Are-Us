public with sharing class MovieShowController 
{
    @AuraEnabled(cacheable=true)
    public static List<Movie_Showing__c> getShows(){
        return [SELECT Id, Name
                FROM Movie_Showing__c
                WITH SECURITY_ENFORCED];
    }

    @AuraEnabled(cacheable=true)
    public static List<Movie_Showing__c> getShowsWithFilter(String movieId, String theatreId){
        return [SELECT Id, Name
                FROM Movie_Showing__c
                WHERE Movie_Name__c = :movieId AND Theatre_Name__c = :theatreId
                WITH SECURITY_ENFORCED];
    }
}